import React from 'react';
import { LOCALES } from '../i18n/locales';

export const I18nSelect = ({setAppLanguage}) => {
  return <select name="cars" id="cars" onChange={(e) => setAppLanguage(e.target.value)}>
    <option value={LOCALES.SPANISH}>Español</option>
    <option value={LOCALES.ENGLISH}>English</option>
  </select>;
};
