import React from 'react';
import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';

export default function CustomAppBar({ navigation, route, options, back }: any) {
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header>
      {}
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      
      <Appbar.Content title={title} />

      {}
      {!back ? (
        <Appbar.Action icon="arrow-right" onPress={() => navigation.navigate('Second')} />
      ) : null}
    </Appbar.Header>
  );
}