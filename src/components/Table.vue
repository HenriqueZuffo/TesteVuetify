<template>
    <div>
        <v-table fixed-header height="300px">
            <thead>
                <tr>
                    <th v-for="field in fields" key="field" class="text-left">
                        {{ field }} 
                    </th>

                    <th v-if="actions">
                        <v-btn @click="onNewRecordClick()">
                            <v-icon icon="mdi-plus"/>
                            Novo                            
                        </v-btn>  
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in data" key='item'>
                    <td v-for="field in fields" key='field'>{{ item[field] }}</td>
                    
                    <td v-if="actions">
                        <v-btn @click="onEditClick(item)">
                            <v-icon icon="mdi-eye" />
                        </v-btn>
                    </td>

                    <td v-if="actions">
                        <v-btn @click="onEditClick(item)">
                            <v-icon icon="mdi-pencil" />
                        </v-btn>                        
                    </td>

                    <td v-if="actions">
                        <v-btn @click="onDeleteClick(item)">
                            <v-icon icon="mdi-delete"/>
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </div>

</template>

<script lang="ts">
    export default {
        props: {
            fields: {
                type: Array<string>
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
    }

</script>

