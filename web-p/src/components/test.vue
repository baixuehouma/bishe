<template>
  <el-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action="http://127.0.0.1:3007/high/addBanner"
    multiple
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :limit="3"
    :on-exceed="handleExceed"
    name="img"
    :headers="header"
  >
    <el-button type="primary">Click to upload</el-button>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500KB.
      </div>
    </template>
  </el-upload>
</template>
<script setup>
import { ref } from "vue";
import {
  ElMessage,
  ElMessageBox,
  UploadProps,
  UploadUserFile,
} from "element-plus";

const header = ref({
  Authorization: localStorage.token,
});
const fileList = ref([]);

const handleRemove = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview = (uploadFile) => {
  console.log(uploadFile);
};

const handleExceed = (files, uploadFiles) => {
  ElMessage.warning(
    `最多选择3条, 加上你现在选择的 ${files.length} 条, 一共有 ${
      files.length + uploadFiles.length
    } 条`
  );
};
</script>
