package com.example.hospitalfinder.hospital;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

// input is address as either zip code or city, state
// returns list of 3 closest hospitals

@RestController
public class HospitalController {
	public Location geoCode(String address, APIKey APIKey) {
		Location result = new Location();
		// build request URL
		String addressUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key="
				+ APIKey.getAPIKey();
		// Send request
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.getForEntity(addressUrl, String.class);
		// Parse response
		JsonObject responseObject = new JsonParser().parse(response.getBody()).getAsJsonObject();
		if (responseObject.getAsJsonArray("results").size() == 0) {
			return new Location();
		}
		// dig the lat out of the response object
		result.setLat(responseObject.getAsJsonArray("results").get(0).getAsJsonObject().get("geometry")
				.getAsJsonObject().get("location").getAsJsonObject().get("lat").getAsString());

		// dig the long out of the response object
		result.setLng(responseObject.getAsJsonArray("results").get(0).getAsJsonObject().get("geometry")
				.getAsJsonObject().get("location").getAsJsonObject().get("lng").getAsString());

		return result;
	}

	// Function returns an array of the 5 closest Hospital
	public List<Hospital> searchHospitals(Location searchFrom, APIKey APIKey) {
		// Build request URL
		String locationUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
				+ searchFrom.getLat() + "," + searchFrom.getLng() + "&radius=15000&type=hospital&key="
				+ APIKey.getAPIKey();

		// Send request
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.getForEntity(locationUrl, String.class);
		JsonObject responseObject = new JsonParser().parse(response.getBody()).getAsJsonObject();

		// Parse data and return an array of hospitals
		List<Hospital> nearestHospitals = new ArrayList<Hospital>();
		for (int i = 0; i < 5; i++) {
			JsonObject currentHospital = responseObject.getAsJsonArray("results").get(i).getAsJsonObject();
			Hospital newHospital = new Hospital();
			newHospital.setPlaceId(currentHospital.getAsJsonObject().get("place_id").getAsString());
			newHospital.setName(currentHospital.getAsJsonObject().get("name").getAsString());
			newHospital.setAddress(currentHospital.getAsJsonObject().get("vicinity").getAsString());
			nearestHospitals.add(newHospital);
		}
		return nearestHospitals;
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/")
	public List<Hospital> findNearestHospitals(@RequestParam String address) {
		APIKey googleAPIKey = new APIKey();
		Location searchFrom = geoCode(address, googleAPIKey);
		return searchHospitals(searchFrom, googleAPIKey);
	}

}
