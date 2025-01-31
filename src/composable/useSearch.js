import {ref, computed} from 'vue'

/*Create a useSearch composable, which receives a list of items, and returns the following:
 searchTerm: The search value.
 filters: A list of fields to filter based on the user’s choice. By default, it’s title.
 filteredItems: The filtered list of the given items. 
*/
export const useSearch = (items)=>{
    const searchTerm = ref('');
    const filters = ref('title');
    //Treba da e computed za da ne se presmetuvaat elementite pri sekoe renderiranje duri
    // i koga nema nov searchTerm ili filter
    const filteredItems = computed(()=>{
        //za sekoj item
        return items.value.filter(item => {
            //se proveruvaat site aktivni filtri i dovolno e samo za eden filter
            return filter.value.some(filter => {
                //vo sodrzinata od item sto ja filtira da se naogja zborot(searchTerm)
                return item[filter].toLowerCase().includes(searchTerm.value.toLowerCase());
            });
        });
    });
    return {
        searchTerm,
        filters,
        filteredItems
        
    };    
}