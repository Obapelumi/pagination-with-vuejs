const paginationApp = new Vue({
    el: '#pagination-app',
    data: {
        posts: [],
        baseUrl: 'https://jsonplaceholder.typicode.com/',
        page: 1,
        perPage: 9,
        pages: [],
    },
    methods: {
        getPosts () {
            axios.get(this.baseUrl+'posts')
            .then(response => {
                this.posts = response.data;
            })
            .catch(response => {
                console.log(response);
            });
        },
        setPages () {
            let numberOfPages = Math.ceil(this.posts.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        },
        paginate (filterResults) {
            let page = this.page;
            let perPage = this.perPage;
            var from = (page * perPage) - perPage;
            var to = (page * perPage);
            return  filterResults.slice(from, to);
        },
    },
    computed: {
        displayedPosts () {
            return this.paginate(this.posts);
        }
    },
    watch: {
        posts () {
            this.setPages();
        }
    },
    created () {
        this.getPosts();
    }
});