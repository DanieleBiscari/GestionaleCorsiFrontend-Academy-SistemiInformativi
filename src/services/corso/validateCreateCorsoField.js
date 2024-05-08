export function validateCreateCorsoField(corso) {
  const validationObj = {};
  const {nomeCorso, descrizioneBreve, descrizioneCompleta, durata}  = corso
  
  if (nomeCorso.match("[a-zA-Z\s']{5,20}")) {
    validationObj.nomeCorso = true;
  } else {
    validationObj.nomeCorso = false;
  }

  if (descrizioneBreve.match("[a-zA-Z\\s']{0,50}")) {
    validationObj.descrizioneBreve = true;
  } else {
    validationObj.descrizioneBreve = false;
  }

  if (descrizioneCompleta.match("[a-zA-Z\\s']{0,250}")) {
    validationObj.descrizioneCompleta = true;
  } else {
    validationObj.descrizioneCompleta = false;
  }

  if (durata >= 0 && durata <= 250 && durata !== "") {
    validationObj.durata = true;
  } else {
    validationObj.durata = false;
  }

  return validationObj;
}
