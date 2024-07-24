const HeadTitle = ({ title }: { title: string }) => {
  return (
    <h4 className="text-base text-slate-500 dark:text-slate-300">
      <div className="flex items-center px-4 pb-2">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAM1BMVEUAAAAzPD40ODs1ODs1ODs1ODs1ODs1ODs1ODs1Nzs1ODs1ODs1ODs1ODs1Nzs1ODs1ODuLv5NVAAAAEHRSTlMACynU5le0gKAZ8cRuN0eOCGadGAAAAr1JREFUSMeFVVu2IyEIbMW3orX/1U5jE23nJDN83HNjKB5FQa5ltqI4ohpCGiO25n1na/P10yq+Wmm/AIAxOVvu3rcWR0qhVnIFsN/9DcrxMXNn+SegfwdkOHHyLd6hqUAs/ACwOBEOcxSSE9+KELs5/Nvqj2pIsXm2j8PA3TDNb8Yb4nB7dc76ti1iCCAOgcT9XmC+t+WRJFz2oASkVwabNcBpHUHCkUO82CGYNTFm1C8ABt3jESN7N4RP0ABvKH5n+jIANwIq9ggT2q9Z4gaV2T4KD4QPGfEV1ZuDDgv3UO+MKZqiYeyghLoFSrAWpI22u5So7IXlHwA4LVXpIGWsFKjji6IExxXFbzo66qcfkIItaIuEL5MWgQNtptd+Mtwp7A54xSWjdHhUbx/AjgyYmakgKrKg5okkAmZCi2K1vCkXIdRtuVgC9VinUMMscQBYAQk8KalmTSNiWo1shEaI+JyOWpfKw60BTHcaujcTgXH/pUWmlwR+i64MHfhGxOyWR0TTRpRNrfVEOCVYtaGN7J7UODWjiJKPzRqLo2c+bajjEhDGsVm2IFnD9nadUNINy8LTidAJekzrwoE8vnZyCaGtGiYuuSJRCrIh/oLwcOusrlyI7c6XZ5HuM0rbAlkRnQI2pQRgllrTtRDDySO/F4fWejsKReZubseJaHc2uOTza/nPg2se7XJ++qQbZuc1nwfsrQ011TBVvUzKC5VL78G6uqcuKh7RpP3atvybOJ3ZWIa0FWn73PC3NjbY2aOf9aEgv7Sx3+uD6EEC6U4uAtTs+mIjIvqpcz2QWxv7EwmC0afOeWhVhL59gGz193COVRB3FgiXJWvQYjYg4GWFKmkffHnyT6ED4V1Fkt/D0Xy3WW+sINRMj3Wq6R+2Edye9EE6+A+CbUvldXH+i5hGSS/O/xHRudTy389/ADZyKbQ/jwhzAAAAAElFTkSuQmCC"
          alt=""
          className="w-8 h-8 mr-2"
        />
        {title}
      </div>
    </h4>
  );
};

export default HeadTitle;
