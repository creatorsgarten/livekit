<script lang="ts">
  import { pocketbase } from '$constants/pocketbase'
  import type { EventsResponse } from 'pocketbase-types'

  export let event: EventsResponse

  let logoPreview: HTMLImageElement
  let logoInput: HTMLInputElement
  let responseMessage: string

  async function onSubmit(ev: SubmitEvent) {
    const formData = new FormData(ev.target as HTMLFormElement)

    for (const [key, value] of formData.entries()) {
      if (!value) {
        formData.delete(key)
      }

      // If value is file and size is 0, delete it
      if (value instanceof File && value.size == 0) {
        formData.delete(key)
      }
    }

    const record = await pocketbase
      .collection('events')
      .update(event.id, formData)

    responseMessage = `Event ${record.name} updated!`
    logoInput.value = ''
    event = record as unknown as EventsResponse
  }

  const previewLogo = (event: Event) => {
    const element = event.currentTarget as HTMLInputElement
    let fileList: FileList | null = element.files

    const file = fileList![0]
    const reader = new FileReader()

    reader.addEventListener('load', event => {
      logoPreview.src = event.target!.result!.toString()
    })

    if (file) {
      reader.readAsDataURL(file)
    }
  }
</script>

<div class="max-w-screen-lg mx-auto my-4">
  {#if responseMessage}
    <p>{responseMessage}</p>
  {/if}
  <form class="max-w-md mx-auto" on:submit|preventDefault={onSubmit}>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="name">Name:</label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
        name="name"
        value={event.name}
        required
      />
    </div>

    <div class="mb-4 flex items-center justify-between gap-2">
      <label class="block text-gray-700 font-bold mb-2" for="logo">Logo:</label>
      <img
        class="w-16 h-auto object-contain"
        src={logoPreview?.src ||
          pocketbase.files.getUrl(event, event.logo, { thumb: '100x250' })}
        alt="Event logo"
        bind:this={logoPreview}
      />

      <input
        type="file"
        id="logo"
        name="logo"
        bind:this={logoInput}
        on:change={previewLogo}
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <!-- TODO: Rest of the inputs -->
    <!-- <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="backgroundType"
        >Background Type:</label
      >
      <select
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="backgroundType"
        name="backgroundType"
        required
      >
        <option value="">Select a background type</option>
        <option value="color">Color</option>
        <option value="image">Image</option>
      </select>
    </div>

    <div class="mb-4" id="backgroundValueColorDiv" style="display: none;">
      <label
        class="block text-gray-700 font-bold mb-2"
        for="backgroundValueColor">Background Color:</label
      >
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="backgroundValueColor"
        type="color"
        name="backgroundValue"
      />
    </div>

    <div class="mb-4" id="backgroundValueImageDiv" style="display: none;">
      <label
        class="block text-gray-700 font-bold mb-2"
        for="backgroundValueImage">Background Image URL:</label
      >
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="backgroundValueImage"
        type="url"
        name="backgroundValue"
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="sponsors"
        >Sponsors:</label
      >
      <div id="sponsorList">
        <div class="mb-4 sponsor">
          <label class="block text-gray-700 font-bold mb-2" for="sponsor1Name"
            >Name:</label
          >
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="sponsor1Name"
            type="text"
            name="sponsor1Name"
            required
          />

          <label class="block text-gray-700 font-bold mb-2" for="sponsor1Logo"
            >Logo URL:</label
          >
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="sponsor1Logo"
            type="url"
            name="sponsor1Logo"
            required
          />

          <label
            class="block text-gray-700 font-bold mb-2"
            for="sponsor1Position">Position:</label
          >
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="sponsor1Position"
            type="number"
            name="sponsor1Position"
            required
          />
        </div>
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button"
        id="addSponsorButton">Add Sponsor</button
      >
    </div> -->

    <div class="flex items-center justify-center">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit">Update</button
      >
    </div>
  </form>
</div>
