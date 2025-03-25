async function loadConfig() {
	const themeModule = await import("./theme.js");

	const currentHour = new Date().getHours();

	if (currentHour < 18) {
		themeModule.setLightTheme();
	} else {
		themeModule.setDarkTheme();
	}
}

// Execute the function
loadConfig();
