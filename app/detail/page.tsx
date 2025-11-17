import { log } from "console"
import { loadVideoDetail } from "../data/repository"

export default async function detailPage(props: { searchParams: { id: string } }) {
    const searchParams = await props.searchParams
    log("searchParams=>", searchParams)
    const data = await loadVideoDetail(searchParams.id)
    const info = data.list[0];
    log(info)
    const urls: string[] = info.vod_play_url.split("$$$")
    return <div className="flex flex-wrap m-10">
        <img src={info.vod_pic} alt={info.vod_name} className="h-100 rounded-2xl" />
        <div className="flex flex-col m-2">
            <div>
                <h1 className="text-2xl">{info.vod_name}</h1>
                <p>{info.vod_sub}</p>
            </div>
            <br />
            <div>
                <p>{info.type_name} ： {info.vod_pubdate} </p>
                <br />
                <p>导演：{info.vod_director}</p>
                <p>演员：{info.vod_actor}</p>
            </div>
            <br />
            <p>{info.vod_content}</p>
            <br />
            <p className="text-gray-500">vod资源: { }</p>
            <div>
                {urls.map((item, idex) => {
                    const epsidose = item.split("#")

                    return <div key={item}>
                        {info.vod_play_from.split("$$$")[idex]}{": | "}
                        {epsidose.map((es:string) => {
                            const array = es.split("$")
                            return <a className="text-blue-400" href={array[1]} key={array[1]} target="blank">{array[0]}{' | '}</a>
                        })
                        }
                    </div>
                })}
            </div>
        </div>

    </div>
}