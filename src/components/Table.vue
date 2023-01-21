<template>
    <div>
        <v-table fixed-header>
            <thead>
                <tr>
                    <th v-for="field in fields" key="field.key" class="text-left">
                        {{ field.title }} 
                    </th>
                    <th v-if="actions"></th>
                    <th v-if="actions"></th>
                    <th v-if="actions">
                        <v-btn @click="onNewRecordClick()" class="bg-deep-purple">
                            <v-icon icon="mdi-plus"/>
                            Novo                            
                        </v-btn>  
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in data" key='item'>
                    <td v-for="field in fields" key='field'>{{ item[field.key] }}</td>
                    
                    <td v-if="actions">
                        <v-btn @click="onEditClick(item)" class="bg-deep-purple">
                            <v-icon icon="mdi-eye" />
                        </v-btn>
                    </td>

                    <td v-if="actions">
                        <v-btn @click="onEditClick(item)" class="bg-deep-purple">
                            <v-icon icon="mdi-pencil" />
                        </v-btn>                        
                    </td>

                    <td v-if="actions">
                        <v-btn @click="onDeleteClick(item)" class="bg-deep-purple">
                            <v-icon icon="mdi-delete"/>
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script lang="ts">
    interface Fields{
        key: string,
        title: string
    }

    export default {
        name: 'Table',
        props: {
            fields: {
                type: Array<Fields>
            },
            data: {
                type: Array<any>
            },
            actions: Boolean,
            onEditClick: {
                type: Function,
                default(){
                    console.log('onEditClick not implemented')
                },
                required: false
            },
            onDeleteClick: {
                type: Function,
                default(){
                    console.log("OndeleteClick not implemented")
                },
                required: false
            },
            onNewRecordClick: {
                type: Function,
                default(){
                    console.log("OnNewRecordClick not implemented")
                },
                required: false
            }
        },
        data(){
            return{
                //
            }
        }
    }
</script>

