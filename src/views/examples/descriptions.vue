<template>
  <div>
    <div>
      <div class="el-descriptions">
        <div class="el-descriptions__header">
          <div class="el-descriptions__title">带边框列表</div>
          <div class="el-descriptions__extra">
            <button type="button" class="el-button el-button--primary el-button--small">
              <span>操作</span>
            </button>
          </div>
        </div>
        <div class="el-descriptions__body">
          <table class="el-descriptions__table is-bordered">
            <tbody>
              <tr class="el-descriptions-row">
                <th colspan="1" class="el-descriptions-item__cell el-descriptions-item__label is-bordered-label ">
                  <i class="el-icon-user"></i>用户名
                </th>
                <td colspan="1" class="el-descriptions-item__cell el-descriptions-item__content">kooriookami</td>
                <th colspan="1" class="el-descriptions-item__cell el-descriptions-item__label is-bordered-label "><i class="el-icon-mobile-phone"></i>手机号</th>
                <td colspan="1" class="el-descriptions-item__cell el-descriptions-item__content">18100000000</td>
                <th colspan="1" class="el-descriptions-item__cell el-descriptions-item__label is-bordered-label ">
                  <i class="el-icon-location-outline"></i>居住地
                </th>
                <td colspan="1" class="el-descriptions-item__cell el-descriptions-item__content">苏州市</td>
              </tr>
            </tbody>
            <tbody>
              <tr class="el-descriptions-row">
                <th colspan="1" class="el-descriptions-item__cell el-descriptions-item__label is-bordered-label ">
                  <i class="el-icon-tickets"></i>备注</th>
                <td colspan="1" class="el-descriptions-item__cell el-descriptions-item__content">
                  <span class="el-tag el-tag--small el-tag--light">学校</span>
                </td>
                <th colspan="1" class="el-descriptions-item__cell el-descriptions-item__label is-bordered-label ">
                  <i class="el-icon-office-building"></i>联系地址
                </th>
                <td colspan="3" class="el-descriptions-item__cell el-descriptions-item__content">
                  江苏省苏州市吴中区吴中大道 1188 号
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div>
      <div class="el-descriptions">
        <div class="el-descriptions__header">
          <div class="el-descriptions__title">用户信息</div>
          <div class="el-descriptions__extra"></div>
        </div>
        <div class="el-descriptions__body">
          <table class="el-descriptions__table">
            <tbody>
              <tr class="el-descriptions-row">
                <td colspan="1" class="el-descriptions-item el-descriptions-item__cell">
                  <div class="el-descriptions-item__container">
                    <span class="el-descriptions-item__label has-colon ">用户名</span>
                    <span class="el-descriptions-item__content">kooriookami</span>
                  </div>
                </td>
                <td colspan="1" class="el-descriptions-item el-descriptions-item__cell">
                  <div class="el-descriptions-item__container">
                    <span class="el-descriptions-item__label has-colon ">手机号</span>
                    <span class="el-descriptions-item__content">18100000000</span>
                  </div>
                </td>
                <td colspan="1" class="el-descriptions-item el-descriptions-item__cell">
                  <div class="el-descriptions-item__container">
                    <span class="el-descriptions-item__label has-colon ">居住地</span>
                    <span class="el-descriptions-item__content">苏州市</span>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr class="el-descriptions-row">
                <td colspan="1" class="el-descriptions-item el-descriptions-item__cell">
                  <div class="el-descriptions-item__container">
                    <span class="el-descriptions-item__label has-colon ">备注</span>
                    <span class="el-descriptions-item__content">
                      <span class="el-tag el-tag--small el-tag--light">学校</span>
                    </span>
                  </div>
                </td>
                <td colspan="2" class="el-descriptions-item el-descriptions-item__cell">
                  <div class="el-descriptions-item__container">
                    <span class="el-descriptions-item__label has-colon ">联系地址</span>
                    <span class="el-descriptions-item__content">江苏省苏州市吴中区吴中大道 1188 号</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>
.el-descriptions__body {
  color: #606266;
  background-color: #fff;

  .el-descriptions__table {
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;

    .el-descriptions-item {
      vertical-align: top;
    }

    .el-descriptions-item__cell {
      box-sizing: border-box;
      text-align: left;
      font-weight: 400;
      line-height: 1.5;
    }
  }
}


.el-descriptions__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .el-descriptions__title {
    font-size: 16px;
    font-weight: 700;
  }
}

.el-descriptions {
  box-sizing: border-box;
  font-size: 14px;
  color: #303133;
  
  // 带边框cell的样式
  .is-bordered {
    table-layout: auto;
    .el-descriptions-item__cell {
      border: 1px solid #ebeef5;
      padding: 12px 10px;
    }
  }

  // 无边框cell的样式
  &:not(.is-bordered) .el-descriptions-item__cell {
    padding-bottom: 12px;
  }
}

.el-descriptions-item__container {
  display: flex;

  .el-descriptions-item__label {
    display: inline-flex;
    align-items: baseline;
  }

  .el-descriptions-item__label:not(.is-bordered-label) {
    margin-right: 10px;
  }

  .el-descriptions-item__label.has-colon:after {
    content: ":";
    position: relative;
    top: -0.5px;
  }

  .el-descriptions-item__content {
    flex: 1;
    word-break: break-word;
    overflow-wrap: break-word;
  }
}
</style>