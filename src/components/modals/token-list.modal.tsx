import { Modal, ModalContent, ModalTitle } from '@mattjennings/react-modal';
import { useState } from 'react';
import { Flex, Heading } from 'theme-ui';

import Tab from '../tabs/tab';
import ManageList from './token-list/manage-list';
import ManageToken from './token-list/manage-token';

interface Props {
  active: boolean;
  onClose: () => void;
}

export default function TokenListModal(props: Props) {
  const { active, onClose } = props;
  const [activeTab, setActiveTab] = useState<'list' | 'token'>('list');

  const _onClose = () => {
    onClose();
  };

  return (
    <Modal
      allowClose={true}
      closeOnOutsideClick={false}
      fullScreen={false}
      onClose={() => _onClose()}
      open={active}
      width={600}
    >
      <ModalTitle>
        <Heading as="h5" variant="styles.h5">
          Token list
        </Heading>
      </ModalTitle>

      <ModalContent sx={{ flexDirection: 'column' }}>
        <Flex sx={{ marginBottom: '2px' }}>
          <Tab
            active={activeTab === 'list'}
            sx={{ flex: 1 }}
            onClick={() => {
              setActiveTab('list');
            }}
          >
            List
          </Tab>

          <Tab
            active={activeTab === 'token'}
            sx={{ flex: 1 }}
            onClick={() => {
              setActiveTab('token');
            }}
          >
            Token
          </Tab>
        </Flex>
        <ManageList active={activeTab === 'list'} />
        <ManageToken active={activeTab === 'token'} />
      </ModalContent>
    </Modal>
  );
}
