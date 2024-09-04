<template>
  <div class="image-list">
    <ul class="upload-list">
      <template v-for="(url, index) in innerImages">
        <li v-if="url" :key="index" class="upload-list__item" :style="itemStyle" @click="onCheck(url, index)">
          <img v-if="isCompletedUrl(url)" :src="url" class="upload-list__thumb" />
          <img v-else :src="prefix + url" class="upload-list__thumb" />
          <label v-if="index === checkedIndex" class="upload-item__status"><i class="el-icon-check" /></label>
          <label v-else class="upload-item__close" @click.stop="onRemove(index)">
            <i class="el-icon-close" />
          </label>
        </li>
      </template>
      <li>
        <el-upload
          class="uploader"
          name="image"
          :action="action"
          :show-file-list="false"
          :on-success="handleUploadSuccess"
          :style="uploadStyle"
          :data="uploadData"
        >
          <i class="el-icon-plus" />
        </el-upload>
      </li>
    </ul>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'ImageList',
  props: {
    images: {
      type: Array,
      default: function() {
        return []
      }
    },
    action: {
      type: String, 
      default: ''
    },
    width: {
      type: Number,
      default: 75
    },
    height: {
      type: Number,
      default: 75
    },
    prefix: {
      type: String,
      default: ''
    },
    type: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      // 存放用户上传的图片地址
      innerImages : this.images,
      checkedIndex: 0,
      uploadData: {
        api_token: getToken(),
        type: this.type
      }
    }
  },
  watch: {
    images(newValue) {
      this.innerImages = []
      this.innerImages = newValue
    },
    type(newValue) {
      this.uploadData.type = newValue
    }
  },
  computed: {
    itemStyle() {
      return 'width:' + this.width + 'px;height:' + this.height + 'px;';
    },
    uploadStyle() {
      return 'width: ' + this.width + 'px;height: ' + this.height + 'px; line-height: ' + this.height + 'px;'
    }
  },
  created() {
  },
  methods: {
    // 针对老项目的特殊处理
    isCompletedUrl(url) {
      return url.indexOf('.com') !== -1 || url.indexOf('.net') !== -1
    },
    handleUploadSuccess(response) {
      const { code, message, data } = response
      if (code) {
        this.$message.error(message)
        return false
      }
      this.innerImages.push(data.url)
      this.onCheck(data.url, this.innerImages.length - 1)
    },
    onCheck(url, index) {
      this.checkedIndex = index
      this.$emit('check', { url, index })
    },
    onRemove(index) {
      this.innerImages.splice(index, 1)
      if (index < this.checkedIndex) {
        this.checkedIndex -= 1
      }
    }
  }
}
</script>

<style lang="scss">
  .image-list {
    .upload-list {
      margin: 0;
      padding: 0;
      list-style: none; 
      display: flex;
      flex-wrap: wrap;
      margin-bottom: -5px;
    }
    
    .upload-list__item {
      transition: all .5s cubic-bezier(.55,0,.1,1);
      margin: 0 5px 5px 0;

      font-size: 14px;
      line-height: 1.8;
      color: #606266;
      background-color: #fff;

      position: relative;
      z-index: 0;
      overflow: hidden;

      box-sizing: border-box;
      border-radius: 4px;
      border: 1px solid #c0ccda;
      border-radius: 6px;
      box-sizing: border-box;
    }

    .upload-list__thumb {
      vertical-align: middle;
      display: inline-block;
      width: 100%;
      position: relative;
      z-index: 1;
      background-color: #fff;
    }

    .upload-item__status {
      position: absolute;
      right: -17px;
      top: -10px;
      width: 40px;
      height: 24px;
      background: #13ce66;
      text-align: center;
      box-shadow: 0 1px 1px #ccc;
      transform: rotate(45deg);
      z-index: 5;
    }

    .upload-item__status i {
      font-size: 10px;
      margin-top: 12px;
      color: #fff;
      transform: rotate(-45deg);
    }
    .upload-item__close {
      cursor: pointer;
      position:absolute;
      z-index: 10; 
      top: 0px;
      right: 0px; 
      font-size: 12px; 
      background-color: #e54d42;
      width: 18px; 
      height: 18px; 
      line-height: 18px; 
      text-align: center; 
      color: #ccc; 
      border-radius:5px;
    }
  }
</style>