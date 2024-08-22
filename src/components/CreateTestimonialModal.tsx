import { toast } from "@pheralb/toast";
import { navigate } from "astro:transitions/client";
import { useEffect, useState } from "preact/compat";
import { $ } from "@/lib/dom-selector";


export const CreateTestimonialModal = () => {
    const [testimonial, setTestimonial] = useState('');
    const [loading, setLoading] = useState(false);
    const [$dialog, $setDialog] = useState<HTMLDialogElement | null>(null);


    const handleTestimonialChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        setTestimonial(target.value);
    };

    const handleSubmit = async () => {
        if (!testimonial) {
            return;
        }
        setLoading(true);
        console.log({ testimonial });
        const response = await fetch('/api/board.json', {
            method: 'POST',
            body: JSON.stringify({
                message: testimonial
            })
        });

        if (response.ok) {
            toast.success({
                text: 'Your message has been submitted!',
            })
            setTestimonial('');
            setLoading(false);
            closeModal();
            navigate('/supporters')
        } else {
            console.error('Failed to submit testimonial');
            toast.error({
                text: 'Failed to submit testimonial',
            })
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!$dialog) {
            const dialog = $('#create-testimonial-modal') as HTMLDialogElement;
            $setDialog(dialog);
        }
    }, []);

    const closeModal = () => {
        if ($dialog) {
            $dialog.close();
        }
    }

    const openModal = () => {
        console.log('open modal');
        console.log($dialog);
        if ($dialog) {
            $dialog.showModal();
        }
    }


    return (
        <div>
            <button onClick={openModal} class="bg-[#ff8e00] font-semibold text-black px-4 py-2 rounded-md mt-4 hover:bg-white hover:text-blak focus:outline-none">
                Write on the board
            </button>

            <dialog id="create-testimonial-modal">
                <div class="p-4 w-full max-w-xl bg-black border-2 border-orange-600">
                    <h2 class="text-xl font-bold mb-4 text-white">
                        Write on the board
                    </h2>
                    <p class="text-white/70 mb-4">
                        <span class="font-bold">Note: </span>Your message needs to be approved before it appears on the board.
                    </p>
                    <p class="text-white/70 mb-4">
                        If you already have a message on the board, this will replace it.
                    </p>
                    <label class="block text-white mb-2" for="testimonial">
                        Your message
                    </label>
                    <textarea
                        class="w-full p-2 border border-zinc-800 placeholder:text-white/50 bg-black/70 text-white rounded"
                        value={testimonial}
                        placeholder="Write your awesome message here..."
                        onInput={handleTestimonialChange}
                    ></textarea>
                    <div class="flex justify-end mt-4">
                        <button
                            class="px-4 py-2 bg-blue-500 text-white cursor-pointer disabled:bg-zinc-600 disabled:text-gray-200"
                            onClick={handleSubmit}
                            disabled={loading}
                            aria-busy={loading}
                            aria-disabled={loading}
                        >
                            {
                                loading ? 'Loading...' : 'Submit'
                            }

                        </button>
                        {
                            !loading && (
                                <button
                                    class="px-4 py-2 bg-gray-300 text-gray-700 ml-2 cursor-pointer"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            )
                        }
                    </div>
                </div>
            </dialog>

        </div>
    );
};
