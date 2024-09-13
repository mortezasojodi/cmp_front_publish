import React, { useEffect, useState } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css';
import styles from './addAdressMap.module.css'

const libraries = ['places'];


export function SearchBox({ onSelectAddress, defaultValue, loader}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    loader
      .load()
      .then(() => {
        setIsLoaded(true);
      })
      .catch((error) => {
        setLoadError(error);
      });
  }, []);

  if (!isLoaded) return null;
  if (loadError) return <div>Error loading</div>;

  return (
    <ReadySearchBox onSelectAddress={onSelectAddress} defaultValue={defaultValue} />
  );
}

function ReadySearchBox({ onSelectAddress, defaultValue }) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300, defaultValue });

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === '') {
      onSelectAddress('', null, null);
    }
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      onSelectAddress(address, lat, lng);
    } catch (error) {
      console.error('😱 Error:', error);
    }
  };

  return (
    <Combobox id="search" onSelect={handleSelect} className={styles.search}>
      <ComboboxInput
        value={value}
        onChange={handleChange}
        disabled={!ready}
        placeholder="Search your location"
        className={styles.searchBar}
        autoComplete="off"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === 'OK' &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}
