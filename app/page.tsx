import Image from "next/image";
import { loadVideoList, search, searchAction } from "./data/repository";
import { log } from "console";
import Link from "next/link";

export default async function Home(props: { searchParams: { name: string } }) {
  const searchParams = await props.searchParams
  let data;
  if (searchParams != null && searchParams.name != null) {
    log("searchParams:", searchParams)
    data = await search(searchParams.name)
  } else {
    data = await loadVideoList()
  }
  const action = searchAction.bind(null)

  if (data == null) {
    return <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <FormComponent/>
      <p>出错了，请重试</p>
    </div>
  }
  log("data:", data, data.list.length)
  const totalpage = data.pagecount;
  const page = data.page;
  if (data.list.length == 0) {
    return <div className="flex flex-col items-center justify-center text-center h-full"><p>暂无数据</p></div>
  }
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <FormComponent/>
      <main className="flex flex-wrap justify-center lg:mx-80">

        {
          data.list.map((item) => (
            <div key={item.vod_id} className="m-2">
              <Link href={`./detail?id=` + item.vod_id}>
                <img src={item.vod_pic} alt={item.vod_name} className="w-60 h-90 object-cover rounded-2xl" width={50} height={70} />
                <p className="w-50 text-center">{item.vod_name}</p>
              </Link>

            </div>
          ))
        }
      </main>
    </div>
  );

  function FormComponent() {
    return <form action={action} className="my-10">
      <input type="text" name="name" id="searchName" placeholder="请输入搜索片名" className="bg-gray-200 rounded-2xl h-8 w-50 cursor-default px-3" />
      <button type="submit" className="bg-green-500 rounded-2xl px-4 py-1 text-white cursor-pointer ml-2">搜索</button>

    </form>;
  }
}
