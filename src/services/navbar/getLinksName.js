export function getLinksName(user) {
  let linksName;
  if (user?.roles?.includes("Admin")) {
    linksName = [
      {
        nome: "Corsi",
        to: "/courses",
      },
      {
        nome: "Admin Panel",
        to: "/admin",
      },
    ];
  } else if (user?.logged) {
    linksName = [
      {
        nome: "Home",
        to: "/",
      },
      {
        nome: "Corsi",
        to: "/courses",
      },
      {
        nome: "I Tuoi Corsi",
        to: "/courses/user",
      },
      {
        nome: "Crea Corso",
        to: "/courses/create",
      },
    ];
  } else {
    linksName = [
      {
        nome: "Home",
        to: "/",
      },
      {
        nome: "Corsi",
        to: "/courses",
      },
    ];
  }

  return linksName;
}
