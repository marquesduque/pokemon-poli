interface AppConfig {
    name: string,
    github: {
        title: string,
        url: string
    },
    author: {
        name: string,
        url: string
    },
}

export const appConfig: AppConfig = {
    name: "Fernando Duque",
    github: {
        title: "Teste Pokemon Poli",
        url: "https://github.com/marquesduque/pokemon-poli",
    },
    author: {
        name: "Fernando Duque",
        url: "https://github.com/marquesduque",
    }
}