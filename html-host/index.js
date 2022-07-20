const render = window.render;

// Simple
render(document.getElementById('app'));

// Using shadow DOM
const shadowHost = document.getElementById('shadow-host');
shadowHost.attachShadow({ mode: 'open' });
const target = shadowHost.shadowRoot;
render(target);
