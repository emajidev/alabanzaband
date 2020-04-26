import React, { Component } from 'react';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade, Shine
  } from "rn-placeholder";
  import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";

export const PreloadContacts = () => (
    <Placeholder
      Animation={props => (
        <Fade {...props} duration={800} />
      )}
      Left={PlaceholderMedia}
      style={{ marginBottom: 20 }}
    >
      <PlaceholderLine style={{ width: responsiveWidth(50) }} />
      <PlaceholderLine style={{ width: responsiveWidth(80) }} />
      <PlaceholderLine style={{ width: responsiveWidth(30) }} />
    </Placeholder>
  );