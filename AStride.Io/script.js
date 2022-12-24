const form = document.querySelector('form');
const zipcodeInput = document.querySelector('#zipcode');
const weatherInfoDiv = document.querySelector('#weather-info');
const outfitSuggestionDiv = document.querySelector('#outfit-suggestion');

form.addEventListener('submit', e => {
  e.preventDefault();
  const zipcode = zipcodeInput.value;
  getWeather(zipcode)
    .then(weather => {
      const temperature = weather.main.temp;
      const description = weather.weather[0].description;
      weatherInfoDiv.innerHTML = `Temperature: ${temperature}°F, Weather: ${description}`;
      suggestOutfit(temperature, description);
    })
    .catch(error => {
      weatherInfoDiv.innerHTML = 'Error getting weather information';
      console.error(error);
    });
});

async function getWeather(zipcode) {
  const apiKey = '4cfdf9032dc2080477d0b30efd9fd512';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  } catch (error) {
    throw error;
  }
}

function suggestOutfit(temperature, description) {
  if (temperature < 50) {
    outfitSuggestionDiv.innerHTML = 'It is cold outside, you should wear a coat, gloves, and boots.';
  } else if (temperature < 70) {
    outfitSuggestionDiv.innerHTML = 'It is cool outside, you should wear a sweater or light jacket.';
  } else if (description.includes('rain')) {
    outfitSuggestionDiv.innerHTML = 'It is raining outside, you should wear a raincoat or umbrella.';
  } else {
    outfitSuggestionDiv.innerHTML = 'It is warm outside, you can wear lightweight clothing.';
  }
}
