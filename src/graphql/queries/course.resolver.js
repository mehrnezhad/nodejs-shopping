import { GraphQLList, GraphQLString } from "graphql";
import { CourseType } from "../typeDefs/course.blog.js";
import { courseModel } from "../../module/course/course.model.js";

export const courseResolver = {
    type: new GraphQLList(CourseType),
    args: {
        category: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const { category } = args
        const query = category ? { category } : {}
        return await courseModel.find(query).populate([{ path: 'teacher' }, { path: 'chapter' }, { path: 'category' }])
    }
}