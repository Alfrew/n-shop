import { Ref, ref } from 'vue';

export default function useControlTouched() {
  const isTouched: Ref<boolean> = ref(false);

  function wasTouched() {
    isTouched.value = true;
  }

  return { isTouched, wasTouched };
}
