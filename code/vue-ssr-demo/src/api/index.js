export function fetchBlogList (blogType) {
  return new Promise((resolve, reject) => {
    /**
    'blog_type',
    'blog_type_str',
    'blog_title',
    'blog_img',
    'blog_intro',
    'blog_create_date',
    'blog_read_count'
     */
    resolve([{
      blog_id: '1',
      blog_type: 'vue books',
      blog_type_str: 'vue books',
      blog_title: 'vue books',
      blog_img: 'vue books',
      blog_intro: 'vue books',
      blog_create_date: 'vue books',
      blog_read_count: 'vue books'
    }])
  })
}
