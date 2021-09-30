package com.example.hospitalfinder.hospital;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
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
	APIKey APIKey = new APIKey();

	@GetMapping("/")
	public List<Hospital> findNearestHospitals(@RequestParam String address) {
		RestTemplate restTemplate = new RestTemplate();
		String addressUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key="
				+ APIKey.getAPIKey();
		ResponseEntity<String> response = restTemplate.getForEntity(addressUrl, String.class);
		JsonObject responseObject = new JsonParser().parse(response.getBody()).getAsJsonObject();
		if (responseObject.getAsJsonArray("results").size() == 0) {
			return new ArrayList<Hospital>();
		}

		String lat = responseObject.getAsJsonArray("results").get(0).getAsJsonObject().get("geometry").getAsJsonObject()
				.get("location").getAsJsonObject().get("lat").getAsString();
		String lng = responseObject.getAsJsonArray("results").get(0).getAsJsonObject().get("geometry").getAsJsonObject()
				.get("location").getAsJsonObject().get("lng").getAsString();
		String location = lat + ", " + lng;

		String locationUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + location
				+ "&radius=15000&type=hospital&key=AIzaSyDpNMsb6YnGI1D0DfzIqoNKrBxe4mfptMg";
		response = restTemplate.getForEntity(locationUrl, String.class);
		responseObject = new JsonParser().parse(response.getBody()).getAsJsonObject();

		List<Hospital> nearestHospitals = new ArrayList<Hospital>();
		for (int i = 0; i < 3; i++) {
			JsonObject currentHospital = responseObject.getAsJsonArray("results").get(i).getAsJsonObject();
			Hospital newHospital = new Hospital();
			newHospital.setName(currentHospital.getAsJsonObject().get("name").getAsString());
			newHospital.setAddress(currentHospital.getAsJsonObject().get("vicinity").getAsString());
			nearestHospitals.add(newHospital);
		}
		return nearestHospitals;
	}

}
