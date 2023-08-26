export interface Rule {
    header: RuleHeader;
    card: RuleCard;
}

interface RuleHeader {
    subtitle: string;
    title: string;
    descriptions: string[];
}

interface RuleCard {
    currentPageNumber: number;
    translate: number;
    list: RuleCardList[];
}

interface RuleCardList {
    title: string;
    description: string;
}

export const rules: Rule[] = [
    {
      header: {
        subtitle: "objetivo",
        title: "Destruye la base enemiga",
        descriptions: [
          "El nexo es el corazón de las bases de ambos equipos.",
          "Destruye el nexo enemigo para ganar la partida."
        ]
      },
      card: {
        currentPageNumber: 1,
        translate: 0,
        list: [
          {title: "tu nexo", description: "Tu nexo es donde los aparecen los súbditos. Detrás de tu nexo se encuentra el fondo de la base, donde puedes recuperar vida y maná rápidamente, así como acceder a la tienda."},
          {title: "Nexo enemigo", description: "Situado en la base del equipo enemigo, el nexo enemigo es igual al tuyo. Al destruir el nexo enemigo, tu equipo gana la partida."}
        ]
      }
    },
    {
      header: {
        subtitle: "estructuras",
        title: "Despeja el camino",
        descriptions: [
          "Tu equipo debe despejar al menos un carril para llegar al nexo enemigo. En tu camino se interponen estructuras defensivas denominadas torretas e inhibidores. Cada carril cuenta con tres torretas y un inhibidor, mientras que cada nexo está protegido por dos torretas."
        ]
      },
      card: {
        currentPageNumber: 1,
        translate: 0,
        list: [
          {title: "TORRETAS", description: "Las torretas infligen daño verdadero a los súbditos y campeones enemigos y proveen visión limitada dentro de la niebla de guerra para su equipo. Ataca estas estructuras al tener súbditos por delante de ti para evitar daño y seguir adelante."},
          {title: "INHIBIDORES", description: "Cada inhibidor está protegido por una torreta. Al destruirlos, aparecerán supersúbditos en ese carril durante varios minutos. Posteriormente, el inhibidor reaparecerá y los supersúbditos dejarán de aparecer."}
        ]
      }
    },
    {
      header: {
        subtitle: "Monstruos Neutrales",
        title: "Domina la jungla",
        descriptions: [
          "Entre los carriles se encuentra la jungla, en donde residen monstruos neutrales y plantas de la jungla. Los dos monstruos más importantes son Barón Nashor y los Dragones. Asesinar a estas unidades otorga mejoras únicas para tu equipo y también puede inclinar la balanza de la partida."
        ]
      },
      card: {
        currentPageNumber: 1,
        translate: 0,
        list: [
          {title: "BARÓN NASHOR", description: "El Barón Nashor es el monstruo más poderoso en la jungla. Asesinar al Barón le otorga al equipo que lo asesinó daño de ataque y poder de habilidad adicionales, una retirada potenciada y aumenta en gran medida el poder de los súbditos cercanos."},
          {title: "DRAGONES", description: "Los dragones son monstruos poderosos que otorgan efectos adicionales únicos dependiendo del elemento del dragón que tu equipo asesine. Existen cuatro dragones elementales y un Dragón Ancestral."}
        ]
      }
    },
    {
      header: {
        subtitle: "Posiciones de carril",
        title: "Elige tu carril",
        descriptions: [
          "Hay cinco posiciones en la composición de equipo recomendada para una partida. Cada carril se presta más para el uso de cierto tipo de campeones y roles, pruébalos todos o juega en tu carril favorito."
        ]
      },
      card: {
        currentPageNumber: 1,
        translate: 0,
        list: [
          {title: "CARRIL SUPERIOR", description: "Los campeones del carril superior son los fuertes luchadores en solitario del equipo. Su trabajo es proteger su carril y enfocarse en los miembros más poderosos del equipo enemigo."},
          {title: "JUNGLA", description: "Los jungleros viven para la caza. Acechan entre carriles con sigilo y habilidad, mantienen vigilados a los monstruos neutrales más importantes y atacan en cuanto un oponente baja la guardia."},
          {title: "CARRIL CENTRAL", description: "Los campeones del carril central tienen un alto daño súbito y pueden hacer de todo, tanto solos como en equipo. Para ellos, el combate es una peligrosa danza en la que siempre están buscando una oportunidad para superar a su oponente."},
          {title: "CARRIL INFERIOR", description: "Los campeones del carril inferior son la dinamita del equipo. Al igual que un cargamento muy valioso, necesitan ser protegidos durante el juego temprano antes de obtener mucho oro y experiencia para llevar al equipo a la victoria."},
          {title: "SOPORTE", description: "Los campeones de soporte son los guardianes del equipo. Ayudan a mantener vivos a los miembros del equipo y a preparar el camino para los asesinatos, protegiendo a su compañero en el carril inferior hasta que se vuelve más fuerte."}
        ]
    }
    }
  ]