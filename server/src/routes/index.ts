import { Router } from 'express';
import {
  SuspectController,
  UserController,
  CommentController,
  EvidenceController,
  appKeyValidator,
} from '@/components/controllers';
import { sanitizer } from '@/helpers';
import { verifyToken } from '@/middlewares/jwtTokenVerifier';

const router = Router();

// Authentication Routes
router.post(
  '/auth',
  sanitizer(appKeyValidator),
  UserController.getUserCredentials
);

router.post(
  '/register',
  sanitizer(appKeyValidator),
  UserController.registerNewUser
);

// User Routes
router.get(
  '/user/:userId',
  verifyToken,
  sanitizer(appKeyValidator),
  UserController.getUserInfoByUserId
);

// Suspect Routes
router.post(
  '/submit-suspect',
  verifyToken,
  sanitizer(appKeyValidator),
  SuspectController.submitSuspectData
);

router.get(
  '/suspects',
  verifyToken,
  sanitizer(appKeyValidator),
  SuspectController.getSuspects
);

router.get(
  '/suspect/:steamId',
  verifyToken,
  sanitizer(appKeyValidator),
  SuspectController.getSuspectBySteamId
);

router.get(
  '/suspect/:steamId/comments',
  verifyToken,
  sanitizer(appKeyValidator),
  CommentController.getSuspectCommentsBySteamId
);

router.post(
  '/suspect/comments',
  verifyToken,
  sanitizer(appKeyValidator),
  CommentController.submitSuspectComment
);

router.post(
  '/suspect/:steamId/add_link',
  verifyToken,
  sanitizer(appKeyValidator),
  SuspectController.addSuspectLink
);

router.delete(
  '/suspect/comments/:commentId',
  verifyToken,
  sanitizer(appKeyValidator),
  CommentController.deleteSuspectCommentByUserId
);

// Evidence Routes
router.get(
  '/evidence/:evidenceId',
  verifyToken,
  sanitizer(appKeyValidator),
  EvidenceController.getEvidenceById
);

router.get(
  '/evidence/:evidenceId/comments',
  verifyToken,
  sanitizer(appKeyValidator),
  CommentController.getEvidenceCommentsByEvidenceId
);

router.get(
  '/evidence-steamId/:steamId',
  verifyToken,
  sanitizer(appKeyValidator),
  EvidenceController.getEvidenceBySteamId
);

router.get(
  '/evidences/flagged',
  verifyToken,
  sanitizer(appKeyValidator),
  EvidenceController.getEvidencesByFlagged
);

router.post(
  '/evidence/comments',
  verifyToken,
  sanitizer(appKeyValidator),
  CommentController.submitEvidenceCommentByEvidenceId
);

router.post(
  '/evidence/flag/:evidenceId',
  verifyToken,
  sanitizer(appKeyValidator),
  EvidenceController.flagEvidenceByUser
);

export default router;
