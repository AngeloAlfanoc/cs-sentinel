import { createLazyFileRoute } from '@tanstack/react-router';
import { fetchSuspectBySteamId } from '../api/suspect';
import EvidenceAccordion from '../components/EvidenceAccordion';
import SteamProfile from '../components/SteamProfile';
import Comments from '../components/SuspectComments';
import CommentInput from '../components/SuspectCommentInput';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import TabPanel from '../components/Tabs/TabsPanel';
import Tabs from '../components/Tabs/Tabs';
import useModalStore from '../stores/useModalStore';
import GenericFooter from '../components/Modal/GenericFooter';
import { SuspectData } from '../types/suspect';
import FaceitProfile from '../components/FaceitProfile';
import LinkModalContent from '../components/Modal/LinkModalContent';
import RelationShipModalContent from '../components/Modal/RelationShipModalContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare as faShare } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { relationShipTypes } from '../constants/suspect';
import Relationships from '../components/Relationships';

export const suspectRoute = createLazyFileRoute('/suspect/$steamId')({
  component: Suspect
});

function Suspect() {
  const { t } = useTranslation();
  const { steamId } = suspectRoute.useParams<{ steamId: string }>();
  const { toggleModal, setPayload } = useModalStore();

  const {
    data: suspect,
    error: suspectError,
    isLoading: suspectLoading
  } = useQuery({
    queryKey: ['suspect', steamId],
    queryFn: () => fetchSuspectBySteamId(steamId),
    enabled: !!steamId
  });

  if (suspectLoading) return <div className='text-white'>{t('loading')}</div>;
  if (suspectError instanceof Error)
    return <div className='text-red-500'>{`${t('error_occurred')} ${suspectError.message}`}</div>;

  const suspectedUser = suspect.data.data as SuspectData;

  const availableOptions = ['Faceit'].filter(
    (option) => !suspectedUser.links.some((link) => link.type === option)
  );

  const toggleLinkModal = () => {
    setPayload({
      modalHeader: <>Add link to {suspectedUser?.personaName}</>,
      modalContent: <LinkModalContent steamId={steamId} existingLinks={suspectedUser.links} />,
      modalFooter: <></>
    });
    toggleModal();
  };

  const toggleRelationShipModal = () => {
    setPayload({
      modalHeader: <>Add relationship to {suspectedUser?.personaName}</>,
      modalContent: (
        <RelationShipModalContent steamId={steamId} relationShipTypes={relationShipTypes} />
      ),
      modalFooter: <GenericFooter />
    });
    toggleModal();
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(t('link_copied'));
  };

  const data = {
    name: 'methoDs',
    children: [
      {
        name: 'Child One',
        children: []
      },
      {
        name: 'Child Two',
        children: []
      }
    ]
  };

  return (
    <Tabs defaultIndex={0}>
      <TabPanel label={t('tabs_profile')}>
        <div className='p-5 bg-gray-800 text-white shadow-lg'>
          <div className='flex flex-row items-center justify-between mb-5'>
            <h1 className='text-2xl font-bold'>{t('suspect_profile_page')}</h1>
            <div className='space-x-2'>
              <button
                onClick={() => toggleLinkModal()}
                className='py-2 px-4 bg-indigo-600 hover:bg-indigo-700 transition duration-300 rounded text-white disabled:opacity-50'
                disabled={availableOptions.length === 0}
              >
                {t('add_link')}
              </button>
              <button
                onClick={() => toggleRelationShipModal()}
                className='py-2 px-4 bg-indigo-600 hover:bg-indigo-700 transition duration-300 rounded text-white'
              >
                {t('add_relationship')}
              </button>
              <button
                onClick={() => copyLink()}
                className='py-2 px-4 bg-indigo-600 hover:bg-indigo-700 transition duration-300 rounded text-white'
              >
                <FontAwesomeIcon icon={faShare} />
              </button>
            </div>
          </div>
          <div className='flex flex-row items-start justify-start space-x-5'>
            <SteamProfile {...suspectedUser} />
            <FaceitProfile {...suspectedUser} />
          </div>

          <CommentInput steamId={steamId} />
          <Comments steamId={steamId} />
        </div>
      </TabPanel>
      <TabPanel label={t('tabs_evidence')}>
        <div className='p-5 bg-gray-800 text-white rounded-lg shadow-lg'>
          <EvidenceAccordion steamId={steamId} />
        </div>
      </TabPanel>
      <TabPanel label={t('tabs_relationship')}>
        <div className='p-5 bg-gray-800 text-white'>
          <div className='flex flex-row items-center justify-between mb-5'>
            <h1 className='text-2xl font-bold'>{t('suspect_profile_page')}</h1>
            <div className='space-x-2'>
              <button
                onClick={() => toggleRelationShipModal()}
                className='py-2 px-4 bg-indigo-600 hover:bg-indigo-700 transition duration-300 rounded text-white'
              >
                {t('add_relationship')}
              </button>
              <button
                onClick={() => copyLink()}
                className='py-2 px-4 bg-indigo-600 hover:bg-indigo-700 transition duration-300 rounded text-white'
              >
                <FontAwesomeIcon icon={faShare} />
              </button>
            </div>
          </div>
        </div>
        <div className='p-5 bg-gray-800 text-white rounded-lg '>
          <Relationships name={data.name} children={data.children} />
        </div>
      </TabPanel>
    </Tabs>
  );
}
