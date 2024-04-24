import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { authorType, PublicCategoryType } from "./public.type.js";

export const EpisodeType = new GraphQLObjectType({
    name : 'EpisodeType',
    fields : {
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    time: { type: GraphQLString },
    type: { type: GraphQLString },
    videoAddress: { type: GraphQLString }
    }
})

export const ChapterType = new GraphQLObjectType({
    name : 'ChapterType',
    fields : {
        title : {type: GraphQLString},
        text: {type: GraphQLString},
        episodes: {type: new GraphQLList(EpisodeType)}
    }
})
export const CourseType = new GraphQLObjectType({
    name : 'CourseType',
    fields : {
        title : {type: GraphQLString},
        slug: {type: GraphQLString},
        short_text: {type: GraphQLString},
        text: {type: GraphQLString},
        image: {type: GraphQLString},
        imageUrl:{type: GraphQLString},
        category: {type: PublicCategoryType},
        price: {type: GraphQLInt},
        discount: {type: GraphQLInt},
        chapter: {type: new GraphQLList(ChapterType)},
        teacher:{type: authorType},
        meta_title:{type: GraphQLString},
        meta_description:{type: GraphQLString},
        canonical:{type: GraphQLString},
        likes: {type : new GraphQLList(authorType)},
        deslikes: {type : new GraphQLList(authorType)},
        bookmarks: {type : new GraphQLList(authorType)},
    }
})