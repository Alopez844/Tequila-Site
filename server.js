const express = require('express');

const PORT = process.env.PORT || 3001;

sequalize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`API server now on port ${PORT}!`));
  });