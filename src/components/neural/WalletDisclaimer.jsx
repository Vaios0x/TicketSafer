import React from 'react';

const WalletDisclaimer = ({ Text, Link }) => (
  <Text>
    Al conectar tu wallet, aceptas nuestros{' '}
    <Link href="https://ticketsafer.com/terms">Términos de Servicio</Link>{' '}
    y{' '}
    <Link href="https://ticketsafer.com/privacy">Política de Privacidad</Link>.
  </Text>
);

export default WalletDisclaimer; 