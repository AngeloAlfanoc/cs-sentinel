import { useNavigate } from '@tanstack/react-router';
import useAuthStore from '../stores/useAuthStore';
import { fetchLoginData } from '../api/user';
import { useMutation } from '@tanstack/react-query';

export interface AuthData {
  user: string;
  token: string;
}

const oauthConfig = {
  client_id: 'e5f789aa-d5cc-4948-8d44-18e0b067c137', // Your FACEIT client_id
  redirect_uri: 'https://cs-sentinel.com/auth/callback', // Replace with your actual redirect URI
  response_type: 'code',
};

export function useAuthentication() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const handleLogin = useMutation({
    mutationFn: fetchLoginData,

    onSuccess: (data: any) => {
      login(data);
      localStorage.setItem(
        'user',
        JSON.stringify({ user: data.data.user, token: data.data.token })
      );
      navigate({to: '/suspects'});
    },
  });

  const handleOAuthLogin = async (provider: string) => {
    const { client_id, redirect_uri, response_type } = oauthConfig;

    // Generate code verifier and code challenge
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // Store code verifier for later use (e.g., in local storage)
    localStorage.setItem('codeVerifier', codeVerifier);

    // Construct authorization URL with PKCE parameters
    const authorizationUrl = `https://accounts.faceit.com/accounts/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=${response_type}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

    // Open a new window with the OAuth URL
    const newWindow = window.open(authorizationUrl, '_blank', 'noopener,noreferrer,width=600,height=600');
    if (newWindow) {
      newWindow.focus();
    }

    // Redirect to '/' after initiating OAuth login
    navigate({to: '/'});
  };

  return { handleLogin, handleOAuthLogin };
}

// Example function to generate code verifier (random string)
function generateCodeVerifier() {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~';
  const randomBytes = new Uint8Array(64);
  window.crypto.getRandomValues(randomBytes);
  return Array.from(randomBytes)
    .map((x) => charset[x % charset.length])
    .join('');
}

// Example function to generate code challenge (SHA-256 hash of code verifier)
async function generateCodeChallenge(codeVerifier: string) {
  const hashed = await sha256(codeVerifier);
  return base64UrlEncode(hashed);
}

// Example function to perform SHA-256 hashing
async function sha256(plain: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
}

// Example function to encode to base64 URL-safe format
function base64UrlEncode(buffer: ArrayBuffer) {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
