import { defineComponent, watchEffect, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProvider } from '../../packages/utils/createContext'
import './activecate.common.less'

const READONLY_LAYOUT_KEY = 'layoutKey'

const ActiveCate = defineComponent({
  props: {
    routerTo: {
      type: [String, Object],
    },
    routerName: String,
  },
  setup(props) {
    const router = useRouter()
    const isActive = ref(false)
    watchEffect(() => {
      isActive.value = router.currentRoute.value.name === props.routerTo.name
    })
    const { ctx } = useProvider(READONLY_LAYOUT_KEY)
    const { handlerMobileTabbarClick } = ctx
    return () => (
      <div
        className="f_doc-active_cate"
        onClick={() => handlerMobileTabbarClick()}
      >
        <fect-link to={props.routerTo} block color={isActive.value}>
          {props.routerName}
        </fect-link>
      </div>
    )
  },
})

export default ActiveCate