const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault(); // Preventing the default behavior
  const installButton = document.getElementById('buttonInstall');
  installButton.style.display = 'block'; // Displaying the install button
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  const promptEvent = new Promise((resolve) => {
    window.addEventListener('beforeinstallprompt', resolve);
  });

  const event = await promptEvent;
  event.prompt();
  const result = await event.userChoice;

  if (result.outcome === 'accepted') {
    console.log('PWA installation successful');
  } else {
    console.log('PWA installation canceled');
  }

  butInstall.style.display = 'none'; // Hiding the install button
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA installed successfully');
});