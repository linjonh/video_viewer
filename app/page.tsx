import Image from "next/image";
import { loadClassTabs, loadVideoList, search, searchAction } from "./data/repository";
import { log } from "console";
import Link from "next/link";
import { VideoItem } from "./data/types";

export default async function Home(props: { searchParams: { name?: string, page?: number, t?: number } }) {
  const searchParams = await props.searchParams
  const tabIndex = searchParams.t ?? 1;

  let data;
  if (searchParams != null && searchParams.name != null) {
    log("searchParams:", searchParams)
    data = await search(searchParams.name)
  } else {
    data = await loadVideoList({ page: searchParams.page ?? 1, clasTab: tabIndex })
  }
  const tabs = await loadClassTabs();
  log("class:", tabs.class)
  const action = searchAction.bind(null)
  const totalpage = data.pagecount;
  const page = data.page;
  log("data:", data.list.length, "page=", page, "totalpage=", totalpage)

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <FormComponent />
      <ul className="flex flex-row flex-wrap justify-center text-white"> {tabs.class.map((item: any) => {
        return <li className={`px-2 py-0.5 rounded  m-2 ${tabIndex == item.type_id ? "bg-red-300" : "bg-blue-300"} hover:bg-red-300 focus:bg-red-300` } key={item.type_id}><Link href={`./?t=` + item.type_id}> {item.type_name}</Link> </li>
      })}</ul>
      {data == null && <p>出错了，请重试</p>}
      {data != null && data.list.length == 0 ? <p>暂无数据</p> : <MainContent data={data} />}

    </div>
  );

  function FormComponent() {
    return <form action={action} className="my-10">
      <input type="text" name="name" id="searchName" placeholder="请输入搜索片名" className="bg-gray-200 rounded-2xl h-8 w-50 cursor-default px-3" />
      <button type="submit" className="bg-green-500 rounded-2xl px-4 py-1 text-white cursor-pointer ml-2">搜索</button>

    </form>;
  }
}
function MainContent({ data }: { data: any }) {
  return <main className="flex flex-wrap justify-center lg:mx-10">

    {data.list.map((item: VideoItem) => (
      <div key={item.vod_id} className="m-2">
        <Link href={`./detail?id=` + item.vod_id}>
          <img src={item.vod_pic} alt={item.vod_name} className="w-60 h-90 object-cover rounded-2xl" width={50} height={70} />
          <p className="w-50 text-center">{item.vod_name}</p>
        </Link>

      </div>
    ))}
  </main>;
}

