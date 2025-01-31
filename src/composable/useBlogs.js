import {createClient} from 'contentful'
import {ref, onBeforeMount} from 'vue'
import {useListActions} from './useListActions'

//Ova e nesto ko logiranje na contentful
const client = createClient({
    space: "hpr0uushokd4",
    accessToken: "jwEHepvQx-kMtO7_2ldjhE4WMAsiDp3t1xxBT8aDp7U"
});

export const useBlogs = () => {
    const blogs = ref([]);
    const loading = ref(false);
    const error = ref(null);
    //od sega ovie f-ii kje rabotat so blogovi, mesto so sto bilo (items)
    const {addItem, deleteItem} = useListActions(blogs);

    //zemanjeto podatoci e asinhrono ,pa mora async/await
    const getBlogs = async ()=> {
        loading.value = true;
        error.value = null;
        try{
            const response = await client.getEntries({
                content_type: "blogPost",
                order: "-fields.publishDate"
            });
            blogs.value = response.items.map((item) => {
                //The returned blogs should be an array of blog items with the following fields: title, description, heroImage, publishDate, and id (a slug).
                return {...item.fields, //gi stava site polinja,pa ako ima drugi kje se ignoriraat
                    id: item.fields.slug
                };
            });
        }catch(err) {
            error.value = err;
        }finally {
            loading.value = false;
        }
    }

    onBeforeMount(getBlogs);

    return {
        blogs,
        loading,
        error,
        addItem,
        deleteItem
    };

}