import React, { useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import { Grid, TextField, Typography, Box } from "@mui/material";
import Script from "next/script";
import PlacesAutocomplete from "react-places-autocomplete/dist/PlacesAutocomplete";

const App = ({ apiUrl }) => {
  const [address, setAdress] = React.useState("");

  const handleChange = (value) => {
    setAdress(value);
  };

  const handleSelect = (value) => {
    setAdress(value);
  };
  return (
    <>
      <Script src={apiUrl} strategy="beforeInteractive" />

      <Container maxWidth="sm">
        <Grid container>
          <Grid item xs={8}>
            <PlacesAutocomplete
              value={address}
              onChange={handleChange}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Enter address ...",
                    })}
                  />

                  <div>
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const style = suggestion.active
                        ? { backgroundColor: "#a83232", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };

                      return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default App;

export const getServerSideProps = async (ctx) => {
  const apiUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_API_KEY}&libraries=places`;

  return {
    props: {
      apiUrl,
    },
  };
};
