
interface AnimPageInstance extends Page.PageInstance {
  store: () => IAnyObject,
  computed: Record<string, () => any>,
  watch: Record<string, (newVal: any, oldVal: any) => void>
}