import { Currency } from '@manekiswap/sdk';
import { Modal, ModalContent, ModalTitle } from '@mattjennings/react-modal';
import { Heading, Text } from '@theme-ui/components';
import DOMPurify from 'dompurify';

interface Props {
  active: boolean;
  onClose: () => void;
  token: Currency;
}

const descSample = `Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.\r\n\r\nBitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.\r\n\r\nBitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the <a href=\"https://www.coingecko.com/en?hashing_algorithm=SHA-256\">SHA-256</a> hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as <a href=\"https://www.coingecko.com/en/coins/litecoin\">Litecoin</a>, <a href=\"https://www.coingecko.com/en/coins/peercoin\">Peercoin</a>, <a href=\"https://www.coingecko.com/en/coins/primecoin\">Primecoin</a>, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by <a href=\"https://www.coingecko.com/en/coins/ethereum\">Ethereum</a> which led to the development of other amazing projects such as <a href=\"https://www.coingecko.com/en/coins/eos\">EOS</a>, <a href=\"https://www.coingecko.com/en/coins/tron\">Tron</a>, and even crypto-collectibles such as <a href=\"https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos\">CryptoKitties</a>.`;

export default function TokenInfoModal(props: Props) {
  const { active, onClose, token } = props;

  return (
    <Modal
      allowClose={true}
      closeOnOutsideClick={true}
      fullScreen={false}
      onClose={onClose}
      open={active}
      sx={{
        maxWidth: 448,
        marginY: 16,
        alignSelf: 'center',
        maxHeight: 'calc(100% - 32px)',
      }}
    >
      <ModalTitle>
        <Heading variant={'styles.h5'}>{token.symbol}</Heading>
      </ModalTitle>
      <ModalContent
        sx={{
          flexDirection: 'column',
          overflow: 'auto',
          '&::-webkit-scrollbar-track': {},
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '8px',
            height: '80px',
            backgroundColor: 'rgba(92, 92, 92, 0.3)',
          },
        }}
      >
        <Text variant="body100" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(descSample) }}></Text>
      </ModalContent>
    </Modal>
  );
}
