<template>
    <div>
      <h1>Blogs</h1>
      <div v-if="isLoading">
        <p>Loading...</p>
      </div>
      <div v-else-if="error">
        <p>{{ error }}</p>
      </div>
      <section v-else>
        <div>
        <label for="search">Search:</label>
        <input type="text" id="search" v-model="searchTerm" />
      </div>
      <fieldset>
        <div>Filter by: </div>
        <input type="checkbox" id="title" value="title" v-model="filters" />
        <label for="title">By Title</label>
        <input
          type="checkbox"
          id="content"
          value="description"
          v-model="filters"
        />
        <label for="content">By Content</label>
      </fieldset>
        <ul>
          <li>
            <article v-for="(blog, i) in filteredBlogs" :key="i">
              <div>
                  <img
                  v-if="blog.heroImage"
                  :src="`${blog.heroImage.fields.file.url}?fit=scale&w=350&h=196`"
                  />
                  <div>
                  <div>
                      {{ new Date(blog.publishDate).toDateString() }}
                  </div>
                  <h4>{{ blog.title }}</h4>
                  <p>{{ blog.description }}</p>
                  </div>
              </div>            
            </article>
          </li>
        </ul>
      </section>
    </div>
  </template>
  <script setup>
  import { defineProps, defineEmits, ref, watch } from "vue";
  import { useSearch } from "../composables/useSearch";
  
  const props = defineProps({
    blogs: {
      type: Array,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    error: {
      type: String,
      required: true,
    },
  });
  
  
  const blogs = ref(props.blogs);
  
  watch(
    () => props.blogs,
    (newBlogs) => {
      blogs.value = newBlogs;
    }
  );
  
  const {
    searchTerm,
    filters,
    filteredItems: filteredBlogs,
  } = useSearch(blogs);
  </script>