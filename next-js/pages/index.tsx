import Header from '@/components/Header'
import SelectCards from '@/components/SelectCards'
import React from 'react'

export default function Home() {
  return (
    <div>
      <div className="home-page">
      <div className="home-page-header">
      <SelectCards />
        {/*
        {!!characters.length && !isFetching && (
          <ApiPagination countItems={data.count} />
        )}
        <SearchBlock /> */}
      </div>
      <div className="home-page-content-wrapper">
        {/* <div className="home-page-content">
          {!data.count && !isFetching && <PageNotFound />}
          {!!characters.length && !isFetching ? <Cards /> : <Loading />}
        </div>
        <Outlet /> */}
      </div>
    </div>
    </div>
  )
}
