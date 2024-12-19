
export default function TrackerInfo({data}) {
  return (
    <section className="relative top-14 rounded-md border max-w-[75rem] bg-white mx-auto p-3 grid grid-cols-4 shadow-lg gap-4">
        {
            data ? (
                <>
                    <div className="p-1 border">
                        <span className="font-semibold">IP ADDRESS</span>
                        {data.ip ? (
                            <p>{data.ip}</p>
                        ):(
                            <p>Not found</p>
                        )}
                    </div>

                    <div className="p-1 border">
                        <span className="font-semibold">LOCATION</span>
                        
                        {data.location ? (
                            <>
                                <p>{data.location?.city}, <span className="location-region">{data.location?.region}</span></p>
                                <p>{data.location?.postalCode}</p>
                            </>
                        ):(
                            <p>Not found</p>
                        )}
                    </div>
                    <div className="p-1 border">
                        <span className="font-semibold">TIMEZONE</span>
                        {data.location ? (
                            <p>UTC {data.location?.timezone}</p>
                        ):(
                            <p>Not found</p>
                        )}

                    </div>
                    <div className="p-1 border">
                        <span className="font-semibold">ISP</span>
                        {data.isp ? (
                            <p>{data.isp}</p>
                        ):(
                            <p>Not found</p>
                        )}
                    </div>
                </>
            ):(
                <p>No se ha podido cargar información.</p>
            )
        }
    </section>  
  )
}
