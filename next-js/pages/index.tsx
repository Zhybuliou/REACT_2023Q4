import ApiPagination from '@/components/ApiPagination'
import Header from '@/components/Header'
import PageNotFound from '@/components/NotFound'
import SearchBlock from '@/components/SearchBlock'
import SelectCards from '@/components/SelectCards'
import React from 'react'

export default function Home() {
  return (
    <div>
      <div className="home-page">
      <div className="home-page-header">
      <SelectCards />
      <ApiPagination countItems={80} />
      <SearchBlock />
      </div>
      <div className="home-page-content-wrapper">
      <PageNotFound />
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
