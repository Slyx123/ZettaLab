import React, { useState, useEffect } from "react";
import axios from "axios";

interface GeoResult {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface WeatherData {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}

const WeatherSection: React.FC = () => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState<GeoResult[]>([]);
  const [selectedCity, setSelectedCity] = useState<GeoResult | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar sugestões de cidades
  useEffect(() => {
    if (!city) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5&language=pt`
        );
        setSuggestions(res.data.results || []);
      } catch {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [city]);

  const handleSelectCity = (geo: GeoResult) => {
    setSelectedCity(geo);
    setCity(`${geo.name}, ${geo.country}`);
    setSuggestions([]);
    setWeather(null);
    setError(null);
  };

  const handleSearch = async () => {
    if (!selectedCity) return;
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&current_weather=true&timezone=auto`
      );
      if (res.data && res.data.current_weather) {
        setWeather(res.data.current_weather);
      } else {
        setError("Não foi possível obter o clima.");
      }
    } catch {
      setError("Erro ao conectar à API de clima.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Clima por Cidade</h2>
      <div className="card mx-auto p-4" style={{ maxWidth: "500px", position: "relative" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setSelectedCity(null);
            setWeather(null);
            setError(null);
          }}
        />

        {suggestions.length > 0 && (
          <ul className="list-group mt-2 position-absolute w-100" style={{ zIndex: 1000 }}>
            {suggestions.map((geo) => (
              <li
                key={geo.id}
                className="list-group-item list-group-item-action"
                style={{ cursor: "pointer" }}
                onClick={() => handleSelectCity(geo)}
              >
                {geo.name}, {geo.country}
              </li>
            ))}
          </ul>
        )}

        <button className="btn btn-primary mt-3 w-100" onClick={handleSearch}>
          Pesquisar
        </button>

        <div className="mt-4 text-center" style={{ minHeight: "120px" }}>
          {loading && <p>Carregando...</p>}
          {error && <p className="text-danger">{error}</p>}
          {weather && selectedCity && (
            <div>
              <h4>{selectedCity.name}, {selectedCity.country}</h4>
              <h5>Temperatura: {weather.temperature}°C</h5>
              <p>Vento: {weather.windspeed} km/h, direção {weather.winddirection}°</p>
              <p>Código do clima: {weather.weathercode}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherSection;
