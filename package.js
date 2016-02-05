Package.describe({
  summary: "Live Query utilizes the power of jQuery selectors by firing callbacks for matched elements auto-magically, even after the page has been loaded and the DOM updated."
});

Package.on_use(function(api, where) {
  api.use('jquery', ['client']);
  api.add_files('./dist/jquery.livequery.js', ['client']);
});
