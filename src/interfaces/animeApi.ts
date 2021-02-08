export interface animeApi {
    data : dataAnime[],
    meta : {
        count : number
    },
    links : {
        first : string,
        next : string,
        last : string
    }
}

export interface dataAnime{
    id : string,
    type : string,
    links : any,
    attributes : {
        createAt : string,
        updateAt : string,
        slug : string,
        synposis : string,
        description : string,
        coverImageTopOffset : number,
        titles : {
            en? : string,
            en_jp? : string,
            en_us? : string,
            ja_jp? : string
        },
        canonicalTitle : string,
        abbreviatedTitles : string[],
        averageRating : string,
        ratingFrequencies : any,
        userCount : number,
        favoritesCount : number,
        startDate : string,
        endDate : string,
        nextRelease : any,
        popularityRank : number,
        ratingRank : number,
        ageRating : string,
        ageRatingGuide : string,
        subtype : string,
        status : string,
        tba : any,
        posterImage : {
            tiny : string,
            small : string,
            medium : string,
            large : string,
            original : string,
            meta : any
        },
        coverImage : {
            tiny : string,
            small : string,
            medium : string,
            large : string,
            original : string,
            meta : any
        },
        episodeCount : number,
        episodeLength : number,
        youtubeVideoId : string,
        nsfw : boolean
    },
    relationships:any
}