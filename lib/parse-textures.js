import {mapKeys, mapValues, groupBy} from 'lodash'

export default function parseTextures(rawTextures) {
    const textures = mapKeys(rawTextures, (_, fileName) => fileName.split(".")[0])

    const animations = mapValues(
        groupBy(
            Object.entries(textures).filter(([key, value]) =>
                key.startsWith("anim_")
            ),
            ([key, value]) => key.substr(0, key.lastIndexOf("_"))
        ),
        (frames) => frames.map((value) => value[1])
    )

    return {
        ...textures,
        ...animations,
    }
}