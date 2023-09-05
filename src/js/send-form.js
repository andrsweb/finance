
import { showPopup } from "./popup"

document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	submitForm( '.hero__form' )
} )

const submitForm = ( selector ) => {
	const forms	= document.querySelectorAll( selector )

	if( ! forms.length ) return

	forms.forEach( form => {
		form.addEventListener( 'submit', e => {
			e.preventDefault()

			const
				request			= new XMLHttpRequest(),
				formData		= new FormData( form ),
				formType		= form.dataset.type,
				isConfirm	= form.dataset.confirm

			formData.append( 'func', formType )
			request.open( 'post', 'send-form.php', true )
			request.responseType = 'json'

			request.addEventListener( 'load', () => {
				// All is good.
				if( request.status === 200 ){
					// Success response.
					if( request.response.success ){
						form.classList.add( 'success' )
						form.classList.remove( 'error' )
						form.reset()
					}	else {	// We've caught an error.
						return
					}
				}
			} )

			request.send( formData )
		} )
	} )
}