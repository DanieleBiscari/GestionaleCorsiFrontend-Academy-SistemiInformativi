export function randomFromArray(array) {
    if (array.length === 0) {
      return undefined;
    }
  
    const indiceCasuale = Math.floor(Math.random() * array.length);
    return array[indiceCasuale];
  }