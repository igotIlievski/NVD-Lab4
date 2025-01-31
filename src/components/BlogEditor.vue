/*Create a BlogEditor component that displays several input fields for the title field, the
author’s name, the blog’s id field, textarea for the blog’s content, and a button element
for saving the blog. When this button is clicked, BlogEditor emits an addNewItem event
with the new blog’s details as the payload and resets the fields. */
<template>
    <div>
        <h1>Blog Editor</h1>
        <div>
            <label for="title">Title</label>
            <input type="text" id="title" v-model="titel">
        </div>
        <div>
            <label for="author">Author</label>
            <input type="text" id="author" v-model="author">
        </div>
        <div>
            <label for="id">ID</label>
            <input type="text" id="id" v-model="id">
        </div>
        <div>
            <label for="content">Content</label>
            <textarea id="content" v-model="content"></textarea>
        </div>
        <div>
            <button @click="save">Save</button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const title = ref('');
    const author = ref('');
    const content = ref('');
    const id = ref('');

    const emits = defineEmits(['addNewItem']);

const save = () => {
    // se frla nastanot addNewItem so detalite za blogot
    emits('addNewItem', ({
        title: title.value,
        author: author.value,
        content: content.value,
        id: id.value
    }));
    //Polinjata se menjavale so kucanje za v-model, se pravat prazni koga kje se
    //klikne save
    title.value = '';
    author.value = '';
    content.value = '';
    id.value = '';
};
</script>