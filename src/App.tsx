import React, { useState, useEffect } from "react";
import "./styles.css";

interface Band {
  name: string;
  recordLabel: string;
}

interface Festival {
  name: string;
  bands: Band[];
}

const App: React.FC = () => {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const errorMsg =
    "Error fetching data. Please refresh the page or try again in some time.";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals"
        );
        if (response.ok) {
          const data: Festival[] = await response.json();
          setFestivals(data);
        } else {
          throw new Error(errorMsg);
        }
      } catch (error) {
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to get festivals attended by a band
  const getFestivalsForBand = (bandName: string) => {
    const bandFestivals: string[] = [];
    festivals.forEach((festival) => {
      const foundBand = festival.bands.find((band) => band.name === bandName);
      if (foundBand) {
        bandFestivals.push(festival.name);
      }
    });
    return bandFestivals.sort();
  };

  // Function to render bands for a record label
  const renderBandsForRecordLabel = (bands: Band[]) => {
    const sortedBands = bands.sort((a, b) => a.name.localeCompare(b.name));

    return sortedBands.map((band) => (
      <div className="band-container" key={band.name}>
        <div className="band-info">
          <h3 className="band">{band.name}</h3>
          <span className="band-badge">Music Band</span>
        </div>
        <div className="festivals">
          {getFestivalsForBand(band.name).map((festival) => (
            <h4 className="festival" key={`${band.name}-${festival}`}>
              {festival}
            </h4>
          ))}
        </div>
      </div>
    ));
  };

  // Function to render record labels and associated bands
  const renderRecordLabels = () => {
    const labelBandsMap: { [label: string]: Band[]; } = {};

    festivals.forEach((festival) => {
      festival.bands.forEach((band) => {
        if (band.recordLabel) {
          if (!labelBandsMap[band.recordLabel]) {
            labelBandsMap[band.recordLabel] = [];
          }
          labelBandsMap[band.recordLabel].push(band);
        }
      });
    });

    const sortedLabels = Object.keys(labelBandsMap).sort();

    return sortedLabels.map((label) => (
      <div className="record-label-container" key={label}>
        <div className="record-label-panel">
          <div className="record-label-row">
            <div className="record-label-info">
              <h2 className="record-label">{label}</h2>
              <span className="record-label-badge">Record Label</span>
            </div>
            {renderBandsForRecordLabel(labelBandsMap[label])}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="app-container">
      {loading ? (
        <div className="loading-message">Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        renderRecordLabels()
      )}
    </div>
  );
};

export default App;