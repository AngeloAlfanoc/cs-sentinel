import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/paywall')({
  component: Paywall
});

function Paywall() {
  const features = [
    { feature: 'Vote on evidence', free: true, premium: true },
    { feature: 'Submit new evidence', free: false, premium: true },
    { feature: 'Add relationships to a suspect', free: false, premium: true },
    { feature: 'Mass Report a user', free: false, premium: true }
  ];

  return (
    <div className='flex h-screen bg-gray-800 text-white'>
      <div
        className='m-auto w-full max-w-xl p-8 shadow-xl rounded-lg bg-gray-900'
        style={{ transform: 'translateY(-20%)' }}
      >
        <h1 className='text-center text-2xl font-bold mb-6'>Features</h1>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr>
              <th className='p-3 border-b border-gray-700'>Feature</th>
              <th className='p-3 border-b border-gray-700'>Free Tier</th>
              <th className='p-3 border-b border-gray-700'>Premium Tier</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index}>
                <td className='p-3 border-b border-gray-700'>{feature.feature}</td>
                <td className='p-3 border-b border-gray-700 text-center'>
                  {feature.free ? '✔️' : '❌'}
                </td>
                <td className='p-3 border-b border-gray-700 text-center'>
                  {feature.premium ? '✔️' : '❌'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
